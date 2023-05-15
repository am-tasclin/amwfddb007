package org.algoritmed.amwfddb007.mcrdb;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "string")
public class StringContent {
    @Id
    private Integer string_id;
    private String value;

    public String getValue() {
        return value;
    }

    public Integer getString_id() {
        return string_id;
    }

    @Override
    public String toString() {
        return String.format("String [string_id=%d, value=%s]", this.string_id, this.value);
    }

    public StringContent(Integer string_id, java.lang.String value) {
        this.string_id = string_id;
        this.value = value;
    }

}
