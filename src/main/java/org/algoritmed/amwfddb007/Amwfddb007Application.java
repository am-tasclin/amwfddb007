package org.algoritmed.amwfddb007;

import org.algoritmed.amwfddb007.webflux.HelloComponent;
import org.algoritmed.amwfddb007.websocket.DbSelectWebSocketHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;

import java.util.HashMap;
import java.util.Map;


@SpringBootApplication
public class Amwfddb007Application {

	public static void main(String[] args) {
		SpringApplication.run(Amwfddb007Application.class, args);
	}

	@Bean
	public DbSelectWebSocketHandler dbSelectWebSocketHandler() {
		return new DbSelectWebSocketHandler();
	}

	@Bean
	public HandlerMapping handlerMapping() {
		Map<String, WebSocketHandler> map = new HashMap<>();
		map.put("/dbSelect", dbSelectWebSocketHandler());
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
