# hexo-generator-hexo2firekylin
[Hexo](https://hexo.io) plugin to generate a JSON file for [firekylin](https://firekylin.org) or [ghost](https://ghost.org) blog system.

# Installation

```
npm i -S hexo-generator-hexo2firekylin
```

# Usage

Hexo will run the generator automagically when you run `hexo serve` or `hexo generate`.

Using the default settings, the `export.json` file looks like the following structure:

```
{
    "meta":{
        // epoch time in milliseconds
        "exported_on":  1388805572000,
        // Data version, current is 003
        "version":      "003"

    },
    "data":{
        "posts": [
            {
                "id":5,
                "title":        "my blog post title",
                "slug":         "my-blog-post-title",
                "markdown":     "the *markdown* formatted post body",
                "html":         "the <i>html</i> formatted post body",
                "page":         0, // boolean indicating if this is a page or post
                "status":       "published", // or draft
                "author_id":    1, // the first user created has an id of 1
                "created_at":   1283780649000, // epoch time in millis
                "created_by":   1, // the first user created has an id of 1
                "updated_at":   1286958624000, // epoch time in millis
                "updated_by":   1, // the first user created has an id of 1
                "published_at": 1283780649000, // epoch time in millis
                "published_by": 1 // the first user created has an id of 1
            }
        ],
        "tags": [
            {
                "id":           3,
                "name":         "Colorado Ho!",
                "slug":         "colorado-ho",
                "description":  ""
            },
            {
                "id":           4,
                "name":         "blue",
                "slug":         "blue",
                "description":  ""
            }
        ],
        "posts_tags": [
            {"tag_id":3, "post_id":5},
            {"tag_id":3, "post_id":2},
            {"tag_id":4, "post_id":24}
        ],
        "categories": [
            {
                "id":           3,
                "name":         "Colorado Ho!",
                "slug":         "colorado-ho",
                "description":  ""
            },
            {
                "id":           4,
                "name":         "blue",
                "slug":         "blue",
                "parent":       3,
                "description":  ""
            }
        ],
        "posts_categories": [
            {"category_id":3, "post_id":5},
            {"category_id":3, "post_id":2},
            {"category_id":4, "post_id":24}
        ],
        "users": [
            {
                "id":           2,
                "name":         "user's name",
                "slug":         "users-name",
                "email":        "user@example.com"
            }
        ],
        "roles_users": [
            {
                "user_id": 2,
                "role_id": 3   
            }
        ]
    }
}
```

# Configuration

You can set some options in `_config.yml` to generate a custom `export.json`.

Default options are as follows:

```
email: admin@admin.com
exportFileName: export.json
```
