package org.algoritmed.amwfddb007.websocket;

import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import org.algoritmed.amwfddb007.mcrdb.DbSqlClient;
import org.springframework.beans.factory.annotation.Autowired;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;

import java.util.concurrent.atomic.AtomicInteger;

public class SimpleWebSocketHandler {
    static AtomicInteger aInt = new AtomicInteger(0);

    @Autowired
    DbSqlClient dbSqlClient;
    ObjectMapper objectMapper = JsonMapper.builder().addModule(new JavaTimeModule()).build();

}