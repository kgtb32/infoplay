package dev.kgtb32.infoplay.infoplay_web.exceptions.command;

import lombok.Getter;

@Getter
public class CommandFailedException extends Exception{
    private final String stderr;

    public CommandFailedException(String stderr){
        super();
        this.stderr = stderr;
    }
}
