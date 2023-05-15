package org.algoritmed.amwfddb007.mcrdb;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table
public class Sort {
    @Id
    private Integer sort_id;
    private Integer sort;

    @Override
    public String toString() {
        return String.format("Sort [sort_id=%d, sort=%d]", sort_id, sort);
    }

    public Sort(Integer sort_id, Integer sort) {
        this.sort_id = sort_id;
        this.sort = sort;
    }
}
