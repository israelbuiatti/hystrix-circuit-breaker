package br.com.example.circuitbreaker.service;

import br.com.example.circuitbreaker.model.Model3;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Date;

@Component
@Log4j2
public class Service3 {

	@Autowired
	private RestTemplate template;

	@HystrixCommand(groupKey = "group1", commandKey = "service3", fallbackMethod = "fallBack", commandProperties = {
			@HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "5000")
	})
	public Model3 service3() {

		Model3 model3 = new Model3();

		String response = template.getForObject("http://localhost:9003/circuit-breaker", String.class);
		model3.setMessage(response);
		log.info("SERVICE3::: {} - {}", new Date(), response);

		return model3;
	}

	public Model3 fallBack(Throwable e) throws Exception {

		log.error("SERVICE3::: {} - {}", new Date(), e.toString());

		Model3 model3 = new Model3();
		model3.setMessage(e.toString());
		model3.setStatus(false);

		return model3;
	}

}
