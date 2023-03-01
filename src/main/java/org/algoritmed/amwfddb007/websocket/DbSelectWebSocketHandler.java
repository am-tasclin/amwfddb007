package org.algoritmed.amwfddb007.websocket;

import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.atomic.AtomicInteger;

import org.algoritmed.amwfddb007.db.DbSqlClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import reactor.core.publisher.Mono;

public class DbSelectWebSocketHandler implements WebSocketHandler {
    protected static final Logger logger = LoggerFactory.getLogger(DbSelectWebSocketHandler.class);
    static AtomicInteger ai = new AtomicInteger(0);

    private @Autowired DbSqlClient dbSqlClient;
    ObjectMapper objectMapper = JsonMapper.builder().addModule(new JavaTimeModule()).build();

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        return session.send(session.receive().map(WebSocketMessage::getPayloadAsText).map(sqlSelectJson -> {
            int incrementAndGet = ai.incrementAndGet();
            Map<String, Object> mapIn = null;
            WebSocketMessage m;
            try {
                mapIn = objectMapper.readValue(sqlSelectJson, Map.class);
                logger.info("-37-" + incrementAndGet + ":, sql:" );
                String sqlSelect = (String) mapIn.get("sql");
                mapIn.put("list", dbSqlClient.getListOfRowObject(sqlSelect).get());
                mapIn.remove("sql");
                String jsonStr = objectMapper.writeValueAsString(mapIn);
                m = session.textMessage(jsonStr);
            } catch (JsonProcessingException | InterruptedException | ExecutionException e) {
                m = session.textMessage(" ERROR:" + incrementAndGet + ":\n" + Map.of("mapIn", mapIn));
                e.printStackTrace();
            }
            logger.info("-50-:" + incrementAndGet);
            return m;
        }));
    }

}
