package kz.jusan.backend.common;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CustomMail {
    private String sender;
    private String receiver;
    private String subject;
    private String text;
}
