package kz.jusan.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto {
    private String fileName;
    private String downloadURL;
    private String fileType;
    private long fileSize;
    private String type;
}
