Please use this file to add any notes about your test that you would like your reviewers to see.

I'm reasonably happy with my implementation of the player UI - it's quite well tested, although I strugged to get the playhead element to match the designs due to having to use overflow: hidden. This is a limitation of the range input element and using box shadow to colour the timeline before the current time.

The result is that the playhead element has to sit within the boundaries of the timeline element.

I looked at implementing it differently using more standard HTML elements, but utlimately thought that the click and drag scrubbing functionality of the range input was worth having over something that matched the design more closely.
