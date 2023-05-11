package org.algoritmed.amwfddb007.db;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.r2dbc.core.DatabaseClient.GenericExecuteSpec;
import org.springframework.stereotype.Component;
import org.springframework.r2dbc.core.FetchSpec;
import reactor.core.publisher.Mono;

@Component
public class DbSqlClient {
    protected static final Logger logger = LoggerFactory.getLogger(DbSqlClient.class);

    DatabaseClient sqlClient;

    public DbSqlClient(@Autowired R2dbcEntityTemplate sqlTemplate) {
        this.sqlClient = sqlTemplate.getDatabaseClient();
    }

    public String sqlAll = "SELECT * FROM idincredit";
    public String sql01 = sqlAll + " LIMIT 1";

    public CompletableFuture<List<Map<String, Object>>> getListOfRowObject(String sql) {
        Mono<List<Map<String, Object>>> collectList = sqlClient.sql(sql).fetch().all().collectList();
        CompletableFuture<List<Map<String, Object>>> future = collectList.toFuture();
        return future;
    }

    public CompletableFuture<Map<String, Object>> getOneRowObject(String sql) {
        FetchSpec<Map<String, Object>> fetch = sqlClient.sql(sql).fetch();
        Mono<Map<String, Object>> o = fetch.one();
        CompletableFuture<Map<String, Object>> future = o.toFuture();
        return future;
    }

    public void updateString(Map mapIn) throws InterruptedException, ExecutionException {
        logger.info("Hi 123 \n" + mapIn);
        Mono<Long> x = sqlClient.sql("UPDATE string SET value=:string WHERE string_id=:adnId")
                .bind("string", mapIn.get("string").toString())
                .bind("adnId", Integer.parseInt(mapIn.get("adnId").toString()))
                .fetch()
                .rowsUpdated();
        CompletableFuture<Long> y = x.toFuture();
        Long long1 = y.get();
        mapIn.put("rowsUpdated", long1);
    }

    public DatabaseClient getSqlClient() {
        return sqlClient;
    }

    public String hello() {
        return "Hello World DB! " + sqlClient;
    }

}
