package com.example.buyroll.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class RedmineService {

    private final RestTemplate restTemplate;

    @Value("${redmine.url}")
    private String redmineUrl;

    @Value("${redmine.api-key}")
    private String apiKey;

    public RedmineService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String createIssue(String subject, String description) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Redmine-API-Key", apiKey);

        Map<String, Object> issue = Map.of(
                "issue", Map.of(
                        "project_id", 1,
                        "subject", subject,
                        "description", description
                )
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(issue, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                redmineUrl + "/issues.json",
                request,
                String.class
        );

        return response.getBody();
    }
}