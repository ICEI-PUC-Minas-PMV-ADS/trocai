package com.example.trocai.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "db_sequence")
@Data
public class DBSequence {


    @Id
    private String id;
    private int seq;
}
