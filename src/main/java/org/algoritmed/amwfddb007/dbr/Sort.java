package org.algoritmed.amwfddb007.dbr;

import org.springframework.data.annotation.Id;

public class Sort {
    @Id
    private Integer sort_id;
    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    private Integer sort;

    public Integer getSort_id() {
        return sort_id;
    }

    public void setSort_id(Integer sort_id) {
        this.sort_id = sort_id;
    }


    @Override
    public String toString() {
        return String.format("Sort [sort_id=%d, sort=%d]", sort_id, sort);
    }

    public Sort(Integer sort_id, Integer sort) {
        this.sort_id = sort_id;
        this.sort = sort;
    }
}
