package org.algoritmed.amwfddb007.websocket;

import java.util.Map;
import java.util.concurrent.ExecutionException;

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

        return session.send(session.receive().map(WebSocketMessage::getPayloadAsText).map(sqlSelectJson -> {
            int incrementAndGet = aInt.incrementAndGet();
            WebSocketMessage m = null;
            Map<String, Object> mapIn = null;
            try {
                mapIn = objectMapper.readValue(sqlSelectJson, Map.class);
                logger.info("-28-\n" + mapIn.get("cmd"));
                switch (mapIn.get("cmd").toString()) {
                    case "insertAdnChild":
                        logger.info("-31-\n" + mapIn);
                        dbSqlClient.insertAdnChild(mapIn);
                        break;
                    case "deleteAdn1":
                        dbSqlClient.deleteAdn1(mapIn);
                        break;
                    case "save1ParentSort":
                        dbSqlClient.save1ParentSort(mapIn);
                        break;
                    case "save1Sort":
                        dbSqlClient.save1Sort(mapIn);
                        break;
                    case "updateString":
                        dbSqlClient.updateString(mapIn);
                        break;
                    case "insertString":
                        dbSqlClient.insertString(mapIn);
                        break;
                }
                logger.info("-40-:" + incrementAndGet + "--\n" + mapIn);
                String jsonStr = objectMapper.writeValueAsString(mapIn);
                m = session.textMessage(jsonStr);
            } catch (JsonProcessingException | InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
            return m;
        }));

    }
}
