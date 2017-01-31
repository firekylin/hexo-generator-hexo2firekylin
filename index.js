var USER_ID = 2;
var USER_ROLE = 3;
var USER_EMAIL = hexo.config.email || 'admin@admin.com';

var postAndPageGenerator = function(post, isPage, published) {
  return {
    id: post._id,
    title: post.title,
    slug: post.slug,
    markdown: post._content,
    html: post.content,
    image: null,
    featured: 0,
    page: isPage,
    status: post.published ? 'published' : 'draft', //or draft
    language: '',
    meta_title: null,
    meta_description: null,
    author_id: USER_ID,
    created_at: +post.date,
    created_by: USER_ID,
    updated_at: +post.updated,
    updated_by: USER_ID,
    published_at: +post.date,
    published_by: USER_ID,
    allow_comment: post.comment
  };
};
var postGenerator = function(post) { return postAndPageGenerator(post, 0, post.published); }
var pageGenerator = function(page) { return postAndPageGenerator(page, 1, true); }

var ghost = {
  meta: {
    exported_on: Date.now(),
    version: '008'
  },
  data: {
    posts: [],
    tags: [],
    posts_tags: [],
    categories: [],
    posts_categories: [],
    users: [{
      id: USER_ID,
      slug: hexo.config.author,
      name: hexo.config.author,
      email: USER_EMAIL
    }],
    role_users: [{
      user_id: USER_ID,
      role_id: USER_ROLE
    }]
  }
};

hexo.extend.generator.register('json-content2', function(locals) {
  if( locals.posts.length ) {
    ghost.data.posts = locals.posts.sort('-date').map(function(post) {
      ghost.data.categories = ghost.data.categories.concat(post.categories.map(function(category) {
        ghost.data.posts_categories.push({
          category_id: category._id,
          post_id: post._id
        });
        return {
          id: category._id,
          name: category.name,
          slug: category.slug,
          parent: category.parent,
          description: ''
        };
      }));
      ghost.data.tags = ghost.data.tags.concat(post.tags.map(function(tag) {
        ghost.data.posts_tags.push({
          tag_id: tag._id,
          post_id: post._id
        });
        return {
          id: tag._id,
          name: tag.name,
          slug: tag.slug,
          description: ''
        }
      }));
      return postGenerator(post);
    });
  }
  if( locals.pages.length ) {
    ghost.data.posts = ghost.data.posts.concat(locals.pages.sort('-date').map(pageGenerator));
  }
  return {
		path: hexo.config.exportFileName || 'export.json',
		data: JSON.stringify(ghost, null, '\t')
	};
});