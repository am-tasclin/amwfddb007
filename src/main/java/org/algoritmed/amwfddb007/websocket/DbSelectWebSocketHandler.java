package org.algoritmed.amwfddb007.websocket;

import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;

import com.fasterxml.jackson.core.JsonProcessingException;
import reactor.core.publisher.Mono;

public class DbSelectWebSocketHandler extends SimpleWebSocketHandler implements WebSocketHandler {
    protected static final Logger logger = LoggerFactory.getLogger(DbSelectWebSocketHandler.class);

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        return session.send(session.receive().map(WebSocketMessage::getPayloadAsText).map(sqlSelectJson -> {
            int incrementAndGet = aInt.incrementAndGet();
            Map<String, Object> mapIn = null;
            WebSocketMessage m;
            try {
                mapIn = objectMapper.readValue(sqlSelectJson, Map.class);
                logger.info("-26-" + incrementAndGet + ":, sql:");
                String sqlSelect = (String) mapIn.get("sql");
                mapIn.put("list", dbSqlClient.getListOfRowObject(sqlSelect).get());
                mapIn.remove("sql");
                String jsonStr = objectMapper.writeValueAsString(mapIn);
                // logger.info("-31-:" + incrementAndGet + "--\n\n" + jsonStr);
                m = session.textMessage(jsonStr);
            } catch (JsonProcessingException | InterruptedException | ExecutionException e) {
                m = session.textMessage(" ERROR:" + incrementAndGet + ":\n" + Map.of("mapIn", mapIn));
                e.printStackTrace();
            }
            logger.info("-50-:" + incrementAndGet + "--\n");
            return m;
        }));
    }

}
