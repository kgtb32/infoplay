package dev.kgtb32.infoplay.infoplay_web.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class RestBadRequest extends RuntimeException{
    public RestBadRequest(String cause){
        super(cause);
    }
}
