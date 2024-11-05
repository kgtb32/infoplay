package dev.kgtb32.infoplay.infoplay_web.services.impl;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import dev.kgtb32.infoplay.infoplay_web.exceptions.RestBadRequest;
import dev.kgtb32.infoplay.infoplay_web.exceptions.command.CommandFailedException;
import dev.kgtb32.infoplay.infoplay_web.models.pulseaudio.PulseAudioResponse;
import dev.kgtb32.infoplay.infoplay_web.services.AudioManager;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PulseAudioManager implements AudioManager{
    private final PulseAudioCommandGenerator commandGenerator;
    private final CommandRunner commandRunner;

    private final ObjectMapper objectMapper;


    @Override
    public PulseAudioResponse[] getSources() {
        try{
            String result = commandRunner.runCommand(commandGenerator.pulseAudioListSinksCommand()).stdout();
            return objectMapper.readValue(result, PulseAudioResponse[].class);
        }
        catch(CommandFailedException|JsonProcessingException e){
            throw new RestBadRequest(e.getMessage());
        }
    }

    @Override
    public boolean changeSource(String sink) {
        try {
            String result = commandRunner.runCommand(commandGenerator.pulseAudioSetDefaultSink(sink)).stderr();
            return result.isBlank();
        } catch (CommandFailedException e) {
            throw new RestBadRequest(e.getMessage());
        }
    }

    @Override
    public boolean changeVolume(String sink, String volume) {
        try {
            String result = commandRunner.runCommand(commandGenerator.pulseAudioSetVolume(sink, volume+"%")).stderr();
            return result.isBlank();
        } catch (CommandFailedException e) {
            throw new RestBadRequest(e.getMessage());
        }    }


    
}
