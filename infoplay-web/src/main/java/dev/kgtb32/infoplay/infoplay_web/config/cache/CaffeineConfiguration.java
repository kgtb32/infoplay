package dev.kgtb32.infoplay.infoplay_web.config.cache;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.github.benmanes.caffeine.cache.Caffeine;

@Configuration
public class CaffeineConfiguration {
    @Value(value = "${app.cache.cacheExpirationDays}")
    private String cacheExpirationDays;

    @Bean
    public Caffeine<Object,Object> caffeineGameDtoConfig() {
        return Caffeine
            .newBuilder()
            .expireAfterWrite(Long.parseLong(cacheExpirationDays), TimeUnit.DAYS);
    }
}
