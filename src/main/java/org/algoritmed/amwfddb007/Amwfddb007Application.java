package org.algoritmed.amwfddb007;

import org.algoritmed.amwfddb007.webflux.HelloComponent;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;


@SpringBootApplication
public class Amwfddb007Application {

	public static void main(String[] args) {
		SpringApplication.run(Amwfddb007Application.class, args);
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
