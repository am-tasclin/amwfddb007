package org.algoritmed.amwfddb007.mcrdb;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Doc {
    @Id
    private Long doc_id;
    private Long parent;
    private Long reference;
    private Long reference2;
    public Long getDoc_id() {
        return doc_id;
    }

    public void setDoc_id(Long doc_id) {
        this.doc_id = doc_id;
    }


    public Long getReference2() {
        return reference2;
    }

    public void setReference2(Long reference2) {
        this.reference2 = reference2;
    }

    public Long getReference() {
        return reference;
    }

    public void setReference(Long reference) {
        this.reference = reference;
    }

    public Long getParent() {
        return parent;
    }

    public void setParent(Long parent) {
        this.parent = parent;
    }

    @Override
    public String toString() {
        String s;
        try {
            s = new ObjectMapper().writeValueAsString(this);
        } catch (JsonProcessingException e) {
            s = String.format("Doc [doc_id=%d, parent=%d]", this.doc_id, this.parent);
            e.printStackTrace();
        }
        return s;
    }

    public Doc(Long doc_id) {
        this.doc_id = doc_id;
    }

}
