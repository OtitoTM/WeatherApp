package com.weather.WeatherWebsite.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

  // Root URL
  @GetMapping("/")
  public String index() {
    return "forward:/index.html";
  }

  // Forward all paths that do NOT contain a dot (e.g., .js, .css, .png)
  @GetMapping("/{path:[^\\.]*}")
  public String forwardPaths() {
    return "forward:/index.html";
  }
}
