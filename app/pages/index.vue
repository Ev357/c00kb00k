<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const localePath = useLocalePath();
navigateTo(localePath("/dashboard"));
</script>
