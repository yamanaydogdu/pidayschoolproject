# Pi Günü Website

This simple page scrolls digits of π across the screen with animated colors and displays rotating fun facts in Turkish. It's designed for Pi Day exhibits on tablets or large screens.

## Files

* `index.html` – main page
* `Scripts/style.css` – layout and animations
* `Scripts/script.js` – drawing logic, facts loader, animation control
* `Data/funfacts.json` – array of translated fun facts in Turkish
* `Data/pi1000.txt` – contains the first 1000 digits of π used by the script
* `Media/sound.png` – speaker icon used for toggling audio
* `Media/Song from π!.mp3` – optional background audio (replace or rename your own file)

## Running

1. **Launch a local server** using Python (run from project root):

   ```bash
   python -m http.server 8000
   ```

   > **Tip:** to hear background sound use `Media/Song from π!.mp3` (or place/rename your own MP3 under Media/) and ensure `Media/sound.png` and `Media/soundclosed.png` are present. Click the speaker icon in the bottom-right corner to toggle audio playback. (The button lights up when music is playing.)

2. Open `http://localhost:8000` in a browser (mobile/tablet recommended).

3. Tap/click the canvas to restart the π scroll.

4. Fun facts update every 15 seconds.

## Regenerating Digits

If you want more than 1000 digits, run the included Python script:

```bash
python Scripts/compute_pi.py 2000 > Data/pi2000.txt
```

and update the `piDigits` constant in `script.js` accordingly.
