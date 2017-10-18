<?php get_header(); ?>
<?php get_sidebar(); ?>

	<div id="content" class="narrowcolumn">

	<?php if (have_posts()) : ?>

		<h2 class="pagetitle">Search Results</h2>

		<ul class="post">
		<?php while (have_posts()) : the_post(); ?>
			<li>
				<h2 class="title"><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title(); ?>"><?php the_title(); ?></a></h2>
				<p class="byline"><small><?php the_time('F jS, Y') ?> by <?php the_author() ?> <?php edit_post_link('Edit', ' | ', ''); ?></small></p>
				<div class="entry">
					<?php the_excerpt(); ?>
					<p class="links"><a href="<?php the_permalink() ?>" class="more">Read More</a></p>
				</div>
			</li>
		<?php endwhile; ?>
		</ul>

		<div class="navigation">
			<div class="alignleft"><?php next_posts_link('&laquo; Previous Entries') ?></div>
			<div class="alignright"><?php previous_posts_link('Next Entries &raquo;') ?></div>
		</div>

	<?php else : ?>

		<h2 class="pagetitle">No posts found. Try a different search?</h2>
	<?php endif; ?>

	</div>
	<?php include (TEMPLATEPATH . '/_sidebar2.php'); ?>


<?php get_footer(); ?>