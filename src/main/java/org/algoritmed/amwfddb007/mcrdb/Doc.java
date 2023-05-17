package org.algoritmed.amwfddb007.mcrdb;

import org.springframework.data.annotation.Id;

public class Doc {
    @Id
    private Integer doc_id;
    private Integer parent;
    private Integer reference;
    private Integer reference2;

    @Override
    public String toString() {
        return String.format("Doc [sort_id=%d]", this.doc_id);
    }

    public Doc(Integer sort_id) {
        this.doc_id = sort_id;
    }

}
