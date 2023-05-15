package org.algoritmed.amwfddb007.mcdb;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import org.algoritmed.amwfddb007.mcrdb.Nextdbid;
import org.algoritmed.amwfddb007.mcrdb.StringContent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.query.Query;
import org.springframework.data.relational.core.query.Update;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.r2dbc.core.DatabaseClient.GenericExecuteSpec;
import org.springframework.stereotype.Component;
import org.springframework.r2dbc.core.FetchSpec;

import reactor.core.publisher.Mono;

@Component
public class DbSqlClient {
    protected static final Logger logger = LoggerFactory.getLogger(DbSqlClient.class);

    DatabaseClient sqlClient;
    R2dbcEntityTemplate sqlTemplate;

    public R2dbcEntityTemplate getSqlTemplate() {
        return sqlTemplate;
    }

    public DbSqlClient(@Autowired R2dbcEntityTemplate sqlTemplate) {
        this.sqlTemplate = sqlTemplate;
        this.sqlClient = sqlTemplate.getDatabaseClient();
    }

    public DatabaseClient getSqlClient() {
        return sqlClient;
    }

    public String hello() {
        return "Hello World DB! " + sqlClient;
    }

    public String sqlAll = "SELECT * FROM idincredit";
    public String sql01 = sqlAll + " LIMIT 1";

    public CompletableFuture<List<Map<String, Object>>> getListOfRowObject(String sql) {
        Mono<List<Map<String, Object>>> collectList = sqlClient.sql(sql).fetch().all().collectList();
        CompletableFuture<List<Map<String, Object>>> future = collectList.toFuture();
        return future;
    }

    public Long nextDbId() {
        return sqlTemplate.select(Nextdbid.class).first().block().getNextval();
    }

    public CompletableFuture<Map<String, Object>> getOneRowObject(String sql) {
        FetchSpec<Map<String, Object>> fetch = sqlClient.sql(sql).fetch();
        Mono<Map<String, Object>> o = fetch.one();
        CompletableFuture<Map<String, Object>> future = o.toFuture();
        return future;
    }

    public void saveSort(Map<String, Object> mapIn) throws InterruptedException, ExecutionException {
        GenericExecuteSpec sql = sqlClient.sql(sqlUpdateSort);
        for (Map<String, Object> map : (List<Map<String, Object>>) (List) mapIn.get("l")) {
            logger.info("i=" + map.get("adnId") + "s=" + map.get("sort"));
            FetchSpec<Map<String, Object>> v = sql
                    .bind("sort", mapIn.get("sort").toString())
                    .bind("adnId", Integer.parseInt(mapIn.get("adnId").toString()))
                    .fetch();
            Mono<Long> x = v.rowsUpdated();
            CompletableFuture<Long> y = x.toFuture();
            Long long1 = y.get();
            mapIn.put("rowsUpdated", long1);
        }
        ;
    }

    // @Modifying
    // @Query("UPDATE sort SET sort=:sort WHERE sort_id=:adnId")
    // Mono<Integer> setFixedSortFor(String sort, Long adnId);

    String sqlUpdateSort = "UPDATE sort SET sort=:sort WHERE sort_id=:adnId";
    String sqlInsertSort = "INSERT INTO sort (sort, sort_id) VALUES (:sort, :adnId)";

    public void save1Sort(Map<String, Object> mapIn) throws InterruptedException, ExecutionException {
        FetchSpec<Map<String, Object>> v = sqlClient.sql(sqlUpdateSort)
                .bind("sort", Integer.parseInt(mapIn.get("sort").toString()))
                .bind("adnId", Integer.parseInt(mapIn.get("adnId").toString()))
                .fetch();
        Mono<Long> x = v.rowsUpdated();
        CompletableFuture<Long> y = x.toFuture();
        Long long1 = y.get();
        mapIn.put("rowsUpdated", long1);
    }

    public void updateString(Map mapIn) throws InterruptedException, ExecutionException {
        CompletableFuture<Long> rowsUpdated = sqlTemplate.update(StringContent.class)
                .matching(Query.query(Criteria.where("string_id")
                        .is(mapIn.get("adnId"))))
                .apply(Update.update("value", mapIn.get("string"))).toFuture();
        mapIn.put("rowsUpdated", rowsUpdated.get());
    }

}
