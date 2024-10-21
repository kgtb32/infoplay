package dev.kgtb32.infoplay.infoplay_web.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class RestNotFound extends RuntimeException{

    public RestNotFound(String cause){
        super(cause);
    }
    
}
