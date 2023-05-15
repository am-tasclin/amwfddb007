package org.algoritmed.amwfddb007.mcrdb;

import org.springframework.data.annotation.Id;

public class Sort {
    @Id
    private Integer sort_id;
    private Integer sort;

    @Override
    public java.lang.String toString() {
        return java.lang.String.format("Sort [sort_id=%d, sort=%d]", sort_id, sort);
    }

    public Sort(Integer sort_id, Integer sort) {
        this.sort_id = sort_id;
        this.sort = sort;
    }
}
