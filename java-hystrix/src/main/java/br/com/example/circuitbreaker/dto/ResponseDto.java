package br.com.example.circuitbreaker.dto;

import br.com.example.circuitbreaker.model.Model1;
import br.com.example.circuitbreaker.model.Model2;
import br.com.example.circuitbreaker.model.Model3;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseDto {
    private Model1 model1;
    private Model2 model2;
    private Model3 model3;
}
