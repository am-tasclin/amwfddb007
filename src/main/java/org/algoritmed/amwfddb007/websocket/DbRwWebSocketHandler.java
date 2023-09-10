package org.algoritmed.amwfddb007.websocket;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.function.Function;

import reactor.core.publisher.Mono;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketSession;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.reactive.socket.WebSocketMessage;

public class DbRwWebSocketHandler extends SimpleWebSocketHandler implements WebSocketHandler {
    protected static final Logger logger = LoggerFactory.getLogger(DbRwWebSocketHandler.class);

    @Override
    public Mono<Void> handle(WebSocketSession session) {

        Function<? super String, ? extends WebSocketMessage> mapper = sqlSelectJson -> {
            logger.info("-25-");
            logger.info(sqlSelectJson);
            int incrementAndGet = aInt.incrementAndGet();
            WebSocketMessage m = null;
            Map<String, Object> mapIn = null;
            try {
                mapIn = objectMapper.readValue(sqlSelectJson, Map.class);
                mapIn.put("incrementAndGet", incrementAndGet);
                logger.info("-28-" + incrementAndGet + ": " + mapIn.get("cmd"));
                // logger.info("-29-\n" + dbSqlClient.getClass().getMethods());
                switch (mapIn.get("cmd").toString()) {
                    case "insertAdnChild":
                        logger.info("-33-\n" + mapIn); // DEPRICATED TO DELETE
                        dbSqlClient.insertAdnChild(mapIn);
                        break;
                    case "insertAdn":
                        logger.info("-37-\n" + mapIn);
                        dbSqlClient.insertAdn(mapIn);
                        break;
                    case "deleteAdn1":
                        dbSqlClient.deleteAdn1(mapIn);
                        break;
                    case "save1ParentSort":
                        dbSqlClient.save1ParentSort(mapIn);
                        break;
                    // case "save1Sort":
                    // dbSqlClient.save1Sort(mapIn);
                    // break;
                    case "updateString":
                        dbSqlClient.updateString(mapIn);
                        break;
                    case "insertString":
                        dbSqlClient.insertString(mapIn);
                        break;
                    case "insertAdnString":
                        dbSqlClient.insertAdnString(mapIn);
                        break;
                    case "updateR1":
                        dbSqlClient.updateR1(mapIn);
                        break;
                    case "updateR2":
                        dbSqlClient.updateR2(mapIn);
                        break;
                    case "executeQuery":
                        dbSqlClient.executeQuery(mapIn);
                        break;
                }
                List<Object> x = (List<Object>) mapIn.get("list");
                logger.info("-68-" + incrementAndGet + ":-size-" + x.size());
                String jsonStr = objectMapper.writeValueAsString(mapIn);
                m = session.textMessage(jsonStr);
            } catch (JsonProcessingException | InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
            return m;
        };
        return session.send(session.receive().map(WebSocketMessage::getPayloadAsText).map(mapper));

    }
}
