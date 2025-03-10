dmx.config({
  "scriptTest": {
    "repeat1": {
      "meta": [
        {
          "type": "text",
          "name": "scriptLine"
        }
      ],
      "outputType": "array"
    },
    "lines": {
      "meta": [
        {
          "name": "getLinesbySection",
          "type": "array",
          "sub": [
            {
              "type": "text",
              "name": "scriptLine"
            }
          ]
        }
      ],
      "outputType": "object"
    },
    "repeat": {
      "meta": [
        {
          "type": "text",
          "name": "scriptLine"
        }
      ],
      "outputType": "array"
    }
  },
  "slideshow": {
    "getSlides": {
      "meta": [
        {
          "type": "text",
          "name": "slideTitle"
        },
        {
          "type": "text",
          "name": "slideDescription"
        },
        {
          "type": "text",
          "name": "slideURL"
        },
        {
          "type": "text",
          "name": "slideContent"
        },
        {
          "type": "number",
          "name": "sortOrder"
        }
      ],
      "outputType": "array"
    },
    "slides": {
      "meta": [
        {
          "name": "$index",
          "type": "number"
        },
        {
          "name": "$key",
          "type": "text"
        },
        {
          "name": "$value",
          "type": "object"
        },
        {
          "type": "text",
          "name": "slideTitle"
        },
        {
          "type": "text",
          "name": "slideDescription"
        },
        {
          "type": "text",
          "name": "slideURL"
        },
        {
          "type": "text",
          "name": "slideContent"
        },
        {
          "type": "number",
          "name": "sortOrder"
        }
      ],
      "outputType": "array"
    }
  },
  "slideShowLayout": {
    "activeSlideIndex": {
      "meta": null,
      "outputType": "object"
    }
  }
});
