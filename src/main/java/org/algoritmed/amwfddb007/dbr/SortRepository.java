package org.algoritmed.amwfddb007.dbr;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import reactor.core.publisher.Mono;

public interface SortRepository extends ReactiveCrudRepository<Sort, Integer> {

    @Query("SELECT * FROM sort WHERE sort_id = :sort_id")
    Mono<Sort> findById(Integer sort_id);

}
