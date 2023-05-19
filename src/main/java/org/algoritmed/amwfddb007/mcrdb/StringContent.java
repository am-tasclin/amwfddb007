package org.algoritmed.amwfddb007.mcrdb;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "string")
public class StringContent {
    @Id
    private Long string_id;
    private String value;

    public String getValue() {
        return value;
    }

    public Long getString_id() {
        return string_id;
    }

    @Override
    public String toString() {
        return String.format("String [string_id=%d, value=%s]", this.string_id, this.value);
    }

    public StringContent(Long string_id, Object value) {
        this.string_id = string_id;
        this.value = value.toString();
    }

}
