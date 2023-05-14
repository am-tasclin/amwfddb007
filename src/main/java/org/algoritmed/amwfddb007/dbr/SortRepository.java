package org.algoritmed.amwfddb007.dbr;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;


public interface SortRepository extends ReactiveCrudRepository<Sort, Integer> {

    // @Query("SELECT * FROM sort WHERE sort_id = :sort_id")
    // TODO with parent SELECT
    // Mono<Sort> findById(Integer sort_id);

}
