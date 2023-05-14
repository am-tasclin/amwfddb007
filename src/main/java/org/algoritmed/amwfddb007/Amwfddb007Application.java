package org.algoritmed.amwfddb007;

import org.algoritmed.amwfddb007.db.DbSqlClient;
import org.algoritmed.amwfddb007.dbr.Nextdbid;
import org.algoritmed.amwfddb007.dbr.Sort;
import org.algoritmed.amwfddb007.dbr.SortRepository;
import org.algoritmed.amwfddb007.webflux.HelloComponent;
import org.algoritmed.amwfddb007.websocket.DbSelectWebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.algoritmed.amwfddb007.websocket.DbRwWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;

import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@SpringBootApplication
public class Amwfddb007Application {
	protected static final Logger logger = LoggerFactory.getLogger(Amwfddb007Application.class);

	public static void main(String[] args) {
		SpringApplication.run(Amwfddb007Application.class, args);
	}

	@Autowired
	DbSqlClient dbSqlClient;

	@Bean
	public CommandLineRunner reactiveDatabaseExample(SortRepository sortRepository,
			@Autowired R2dbcEntityTemplate sqlTemplate) {
		return args -> {
			logger.info(("\n reactiveDatabaseExample"));
			Long y3 = dbSqlClient.nextDbId();
			logger.info(" " + y3);
			Sort s = new Sort(376642, 1111);
			logger.info(" " + s);
			List<Sort> sortL = Arrays.asList(s);

			// Sort x = sqlTemplate.insert(Sort.class).using(s).block();
			// .as(StepVerifier::create)
			// .expectNextCount(1)
			// .verifyComplete()
			;

			// sortRepository.save(s).subscribe();

			Sort x = sortRepository.saveAll(sortL).blockLast();

			logger.info(" " + x);

		};
	}

	@Bean
	public DbSelectWebSocketHandler dbSelectWebSocketHandler() {
		return new DbSelectWebSocketHandler();
	}

	@Bean
	public DbRwWebSocketHandler dbRwWebSocketHandler() {
		return new DbRwWebSocketHandler();
	}

	@Bean
	public HandlerMapping handlerMapping() {
		Map<String, WebSocketHandler> map = new HashMap<>();
		map.put("/dbSelect", dbSelectWebSocketHandler());
		map.put("/dbRw", dbRwWebSocketHandler());
		// logger.info("-26-\n" + map);
		return new SimpleUrlHandlerMapping(map, Ordered.HIGHEST_PRECEDENCE);
	}

	@Bean
	public RouterFunction<ServerResponse> route(HelloComponent helloComponent) {
		return RouterFunctions
				.route(GET("/wf/select").and(accept(MediaType.APPLICATION_JSON)),
						helloComponent::select)
				.andRoute(GET("/wf/hello2").and(accept(MediaType.APPLICATION_JSON)),
						helloComponent::selectListResponse)
				.andRoute(GET("/wf/hello").and(accept(MediaType.APPLICATION_JSON)),
						helloComponent::hello)
				.andRoute(GET("/r/url_sql_read_db2").and(accept(MediaType.APPLICATION_JSON)),
						helloComponent::select2list)
				.andRoute(GET("/r/url_sql_read_db1").and(accept(MediaType.APPLICATION_JSON)),
						helloComponent::select2list01);
	}
}
