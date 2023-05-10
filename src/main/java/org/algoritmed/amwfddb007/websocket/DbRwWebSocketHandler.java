package org.algoritmed.amwfddb007.websocket;

import java.util.Map;
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
                mapIn.put("x", "y");
                String jsonStr = objectMapper.writeValueAsString(mapIn);
                m = session.textMessage(jsonStr);

	            logger.info("-26-:" + incrementAndGet + "--\n\n" + mapIn);

            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
            return m;
        }));

    }
}
