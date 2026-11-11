<script lang="ts">
  import { Spinner, LoadingDots, Skeleton } from "@rblez-ui/svelte";
</script>

<div class="demo-load">
  <div class="demo-row">
    <Spinner size={14} />
    <Spinner />
    <Spinner size={28} />
    <Spinner size={28} color="var(--d-brand)" />
    <LoadingDots />
    <LoadingDots>Desplegando</LoadingDots>
  </div>

  <div class="demo-skel">
    <Skeleton shape="circle" height={40} />
    <div>
      <Skeleton width="60%" height={14} />
      <Skeleton width="90%" height={12} />
    </div>
    <Skeleton class="demo-skel__img" height={120} />
    <Skeleton shape="pill" width={96} height={30} />
  </div>
</div>
