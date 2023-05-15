package org.algoritmed.amwfddb007.mcrdb;

import org.springframework.data.annotation.Id;

public class String {
    @Id
    private Integer string_id;
    private java.lang.String value;

    @Override
    public java.lang.String toString() {
        return java.lang.String.format("String [string_id=%d, value=%s]", this.string_id, this.value);
    }

    public String(Integer string_id, java.lang.String value) {
        this.string_id = string_id;
        this.value = value;
    }

}
