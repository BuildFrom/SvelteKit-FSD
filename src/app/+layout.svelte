<script>
  import "./styles/global.css";
  import { Header } from "@/widgets";
</script>

<div class="app">
  <Header />
  <main>
    <slot />
  </main>
</div>
