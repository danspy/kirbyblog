<?php snippet('header') ?>

	<main class="main" role="main">
		<?php foreach($page->children()->visible()->flip() as $article): ?>

			<?php if($image = $article->images()->sortBy('sort', 'asc')->first()): $backgroundimage = $image->url(); ?>
			<article class="bg" style="background: url(<?php echo $backgroundimage ?>) no-repeat center; background-size: cover;">
			<?php else: ?>
			<article<?php if(($article->bgcolor()) || ($article->textcolor())) { ?> style="background-color: <?php echo $article->bgcolor(); ?>; color: <?php echo $article->textcolor(); ?>;"<?php } ?>>
			<?php endif ?>
				<div class="overlay"></div>
				<div class="post-meta">
					<h2><a<?php if($article->linkcolor()) { echo ' style="color: '.$article->linkcolor().'"'; } ?> href="<?php echo $article->url(); ?>"><?php echo $article->title()->html() ?></a></h2>
				</div>
			</article>
			
		<?php endforeach ?>
	</main>

	<section id="about">
		<div class="row">
			<?php echo $page->text()->kirbytext() ?>			
		</div>
	</section>

<?php snippet('footer') ?>