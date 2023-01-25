package org.algoritmed.amwfddb007.db;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Component;
import org.springframework.r2dbc.core.FetchSpec;
import reactor.core.publisher.Mono;

@Component
public class DbSqlClient {
    private DatabaseClient sqlClient;

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

    public DatabaseClient getSqlClient() {
        return sqlClient;
    }

    public String hello() {
        return "Hello World DB! " + sqlClient;
    }

}
