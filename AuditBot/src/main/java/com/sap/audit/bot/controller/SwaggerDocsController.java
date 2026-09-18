package com.sap.audit.bot.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SwaggerDocsController {

    @GetMapping(value = "/api/docs", produces = MediaType.TEXT_HTML_VALUE)
    public String getSwaggerDocsHtml() {
        return "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <title>Swagger UI - AuditBot Backend APIs</title>\n" +
                "    <link rel=\"stylesheet\" type=\"text/css\" href=\"/swagger-ui/swagger-ui.css\" />\n" +
                "    <link rel=\"stylesheet\" type=\"text/css\" href=\"/swagger-ui/index.css\" />\n" +
                "    <link rel=\"icon\" type=\"image/png\" href=\"/swagger-ui/favicon-32x32.png\" sizes=\"32x32\" />\n" +
                "    <style>\n" +
                "        html { box-sizing: border-box; overflow-y: scroll; }\n" +
                "        *, *:before, *:after { box-sizing: inherit; }\n" +
                "        body { margin: 0; background: #fafafa; }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div id=\"swagger-ui\"></div>\n" +
                "    <script src=\"/swagger-ui/swagger-ui-bundle.js\" charset=\"UTF-8\"> </script>\n" +
                "    <script src=\"/swagger-ui/swagger-ui-standalone-preset.js\" charset=\"UTF-8\"> </script>\n" +
                "    <script>\n" +
                "    window.onload = function() {\n" +
                "      const ui = SwaggerUIBundle({\n" +
                "        url: \"/v3/api-docs\",\n" +
                "        dom_id: '#swagger-ui',\n" +
                "        deepLinking: true,\n" +
                "        docExpansion: 'list',\n" +
                "        operationsSorter: 'method',\n" +
                "        tagsSorter: 'alpha',\n" +
                "        presets: [\n" +
                "          SwaggerUIBundle.presets.apis,\n" +
                "          SwaggerUIStandalonePreset\n" +
                "        ],\n" +
                "        plugins: [\n" +
                "          SwaggerUIBundle.plugins.DownloadUrl\n" +
                "        ],\n" +
                "        layout: \"StandaloneLayout\"\n" +
                "      });\n" +
                "      window.ui = ui;\n" +
                "    };\n" +
                "    </script>\n" +
                "</body>\n" +
                "</html>";
    }
}
