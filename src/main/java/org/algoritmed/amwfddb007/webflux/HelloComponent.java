package org.algoritmed.amwfddb007.webflux;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.atomic.AtomicInteger;

import org.algoritmed.amwfddb007.mcrdb.DbSqlClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.r2dbc.core.RowsFetchSpec;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.reactive.function.server.ServerResponse.BodyBuilder;

import io.r2dbc.spi.ColumnMetadata;
import reactor.core.publisher.Mono;

@Component
public class HelloComponent {
  protected static final Logger logger = LoggerFactory.getLogger(HelloComponent.class);
  static AtomicInteger ai = new AtomicInteger(0);
  private @Autowired DbSqlClient dbSqlClient;
  private BodyBuilder builderResponse;

  public Mono<ServerResponse> select2list01(ServerRequest request) {
    int incrementAndGet = ai.incrementAndGet();
    
    logger.info("-93-" + incrementAndGet + ": /r/url_sql_read_db1");
    Map<String, Object> m = new HashMap<String, Object>();
    String sql = request.queryParam("sql").get();
    try {
      m.put("list", dbSqlClient.getListOfRowObject(sql).get());
    } catch (InterruptedException | ExecutionException e) {
      m.put("ERROR", Map.of("sql", sql));
      e.printStackTrace();
    }
    logger.info("-93-:" + incrementAndGet);
    return builderResponse.body(BodyInserters.fromValue(m));
  }

  public Mono<ServerResponse> select2list(ServerRequest request) {
    logger.info("-57- " + ai.incrementAndGet() + " /r/url_sql_read_db2");
    return select2list(request.queryParam("sql").get());
  }

  private Mono<ServerResponse> select2list(String sql) {
    RowsFetchSpec<Map<String, Object>> mapRowsFetchSpec = dbSqlClient.getSqlClient().sql(sql)
        .map((row, rowMetadata) -> {
          Map<String, Object> rowMap = new HashMap<String, Object>();
          for (ColumnMetadata columnMetadata : rowMetadata.getColumnMetadatas())
            rowMap.put(columnMetadata.getName(), row.get(columnMetadata.getName()));
          return rowMap;
        });
    Map<String, Object> responseMap = new HashMap<String, Object>();
    try {
      responseMap.put("list", mapRowsFetchSpec.all().collectList().toFuture().get());
    } catch (InterruptedException | ExecutionException e) {
      responseMap.put("ERROR", Map.of("sql", sql));
      e.printStackTrace();
    }
    return builderResponse.body(BodyInserters.fromValue(responseMap));
  }

  // Right Hello - history of 'recherche'

  // public Mono<String> helloPerson(String name) {
  public Mono<ServerResponse> helloPerson(ServerRequest request) {
    Map m = new HashMap();
    m.put("name", "m");
    return builderResponse.body(BodyInserters.fromValue(m));
    // return builderResponse.body(Mono.just("Hello " + name + "!"));
    // return Mono.just("Hello " + name + "!");
  }

  public Mono<ServerResponse> hello(ServerRequest request) {
    return select2list(dbSqlClient.sqlAll);
  }

  public Mono<ServerResponse> selectListResponse(ServerRequest request) {
    List<Map<String, Object>> g = null;
    try {
      g = dbSqlClient.getListOfRowObject(dbSqlClient.sqlAll).get();
    } catch (InterruptedException | ExecutionException e) {
      e.printStackTrace();
    }
    return builderResponse.body(BodyInserters.fromValue(g));
  }

  public Mono<ServerResponse> select(ServerRequest request) {
    Map<String, Object> map;
    logger.info("-106- " + ai.incrementAndGet() + " /wf/select\n" + dbSqlClient.getOneRowObject(dbSqlClient.sql01));
    try {
      map = dbSqlClient.getOneRowObject(dbSqlClient.sql01).get();
    } catch (InterruptedException | ExecutionException e) {
      map = Map.of("x", "ERROR");
      e.printStackTrace();
    }
    return builderResponse.body(BodyInserters.fromValue(map));
  }

  public HelloComponent() {
    this.builderResponse = ServerResponse.ok().contentType(MediaType.APPLICATION_JSON);
  }

}
