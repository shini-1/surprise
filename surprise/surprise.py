from pathlib import Path

import reflex as rx


APP_DIR = Path(__file__).resolve().parent.parent
POEM_PATH = APP_DIR / "poem.txt"

POEM_STANZAS = [
    [line.strip() for line in stanza.splitlines() if line.strip()]
    for stanza in POEM_PATH.read_text(encoding="utf-8").strip().split("\n\n")
]

if len(POEM_STANZAS) != 5:
    raise ValueError("poem.txt must contain exactly 5 stanzas separated by blank lines.")


BURGUNDY = "#800020"
BLUSH = "#F4C2C2"


class AppState(rx.State):
    """Main application state."""

    current_page: int = 1

    def go_to_page(self, page: int):
        """Move to a specific layout."""
        self.current_page = page

    def go_back(self):
        """Navigate to previous page."""
        if self.current_page > 1:
            self.current_page -= 1

    def advance_to_choice(self):
        self.current_page = 2

    def advance_to_reward(self):
        self.current_page = 3

    def advance_to_reluctance(self):
        self.current_page = 4

    def advance_to_surrender(self):
        self.current_page = 5


def action_button(label: str, event) -> rx.Component:
    return rx.button(
        label,
        on_click=event,
        class_name="love-button",
    )


def back_button() -> rx.Component:
    return rx.button(
        "← Back",
        on_click=AppState.go_back,
        class_name="back-button",
    )


def image_card() -> rx.Component:
    return rx.image(
        src="/custom_image.png",
        alt="A romantic placeholder image you can replace in assets/custom_image.png",
        class_name="hero-image",
    )


def bouquet_canvas() -> rx.Component:
    return rx.el.canvas(
        id="bouquet-canvas",
        width="440",
        height="320",
        class_name="bouquet-canvas",
        aria_label="Illustrated bouquet of flowers",
        on_mount=rx.call_script(
            """
            (() => {
              if (window.drawBouquet) {
                window.drawBouquet("bouquet-canvas");
                return;
              }
              window.setTimeout(() => {
                if (window.drawBouquet) {
                  window.drawBouquet("bouquet-canvas");
                }
              }, 150);
            })()
            """
        ),
    )


def poem_block() -> rx.Component:
    return rx.vstack(
        *[
            rx.box(
                *[
                    rx.text(
                        line,
                        class_name="poem-line",
                    )
                    for line in stanza
                ],
                class_name="poem-stanza",
            )
            for stanza in POEM_STANZAS
        ],
        class_name="poem-wrap",
        width="100%",
        spacing="4",
    )


def layout_greeting() -> rx.Component:
    return rx.vstack(
        back_button(),
        rx.heading("Helloo Kal!", as_="h1", class_name="hero-title"),
        rx.hstack(
            action_button("Hello", AppState.advance_to_choice),
            action_button("Hi", AppState.advance_to_choice),
            class_name="button-row",
        ),
        class_name="panel-stack",
    )


def layout_choice() -> rx.Component:
    return rx.vstack(
        back_button(),
        image_card(),
        rx.heading("I have something for you", as_="h2", class_name="panel-title"),
        rx.hstack(
            action_button("What is it?", AppState.advance_to_reward),
            action_button("Ayoko", AppState.advance_to_reluctance),
            class_name="button-row",
        ),
        class_name="panel-stack",
    )


def layout_reward() -> rx.Component:
    return rx.vstack(
        back_button(),
        rx.heading("I love you my kalon!", as_="h2", class_name="panel-title"),
        rx.box(
            bouquet_canvas(),
            class_name="bouquet-container",
        ),
        poem_block(),
        class_name="panel-stack",
    )


def layout_reluctance() -> rx.Component:
    return rx.vstack(
        back_button(),
        rx.heading("Ayaw mo talaga? :((", as_="h2", class_name="panel-title"),
        rx.hstack(
            action_button("Ayoko", AppState.advance_to_surrender),
            action_button("Whtvr", AppState.advance_to_surrender),
            class_name="button-row",
        ),
        class_name="panel-stack",
    )


def layout_surrender() -> rx.Component:
    return rx.vstack(
        back_button(),
        rx.heading("Wala ka na talagang choice", as_="h2", class_name="panel-title"),
        rx.hstack(
            action_button("Sige na nga", AppState.advance_to_reward),
            action_button("Sige na nga", AppState.advance_to_reward),
            class_name="button-row",
        ),
        class_name="panel-stack",
    )


def current_layout() -> rx.Component:
    return rx.match(
        AppState.current_page,
        (1, layout_greeting()),
        (2, layout_choice()),
        (3, layout_reward()),
        (4, layout_reluctance()),
        (5, layout_surrender()),
        layout_greeting(),
    )


@rx.page(
    title="For Kal",
    description="Surprise be!!!!",
)
def index() -> rx.Component:
    return rx.box(
        rx.box(
            current_layout(),
            class_name="main-card",
        ),
        class_name="app-shell",
    )


app = rx.App(
    stylesheets=[
        "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Playfair+Display:wght@600;700&family=Angelleta&display=swap",
        "/styles.css",
    ],
    head_components=[
        rx.script(src="/bouquet.js"),
        rx.script("""
(() => {
  const heartColors = ['#FF1493', '#FF69B4', '#FFB6D9', '#FF6B9D', '#C4226F'];
  
  function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '♥';
    
    const color = heartColors[Math.floor(Math.random() * heartColors.length)];
    heart.style.color = color;
    
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 50;
    
    heart.style.left = startX + 'px';
    heart.style.top = startY + 'px';
    
    const duration = 4 + Math.random() * 3;
    const tx = (Math.random() - 0.5) * 400;
    const ty = -(window.innerHeight + 100 + Math.random() * 200);
    
    heart.style.setProperty('--duration', duration + 's');
    heart.style.setProperty('--tx', tx + 'px');
    heart.style.setProperty('--ty', ty + 'px');
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }
  
  setInterval(createHeart, 800 + Math.random() * 1200);
})();
        """),
    ],
)
