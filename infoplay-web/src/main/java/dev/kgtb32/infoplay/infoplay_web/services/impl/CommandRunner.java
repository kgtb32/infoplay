package dev.kgtb32.infoplay.infoplay_web.services.impl;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;

import dev.kgtb32.infoplay.infoplay_web.exceptions.command.CommandFailedException;

@Service
public class CommandRunner {
    public record CommandResult(
        String stdout,
        String stderr
    ){}
    
    public CommandResult runCommand(List<String> command) throws CommandFailedException{
        if(command.isEmpty()){
            throw new CommandFailedException("no command specified.");
        }
        try {
            Process commandProcess = new ProcessBuilder(command).start();
            commandProcess.waitFor();
            return new CommandResult(
                IOUtils.toString(commandProcess.getInputStream(),Charset.defaultCharset()),
                IOUtils.toString(commandProcess.getErrorStream(), Charset.defaultCharset())
            );
        } catch (IOException e) {
            throw new CommandFailedException(e.getMessage());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new CommandFailedException("Interrupted");
        }
    }
}
