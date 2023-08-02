# Legacy Menu Block
Contributors:      vena\
Tags:              block\
Tested up to:      6.1\
Stable tag:        0.1.0\
License:           GPL-2.0-or-later\
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

WordPress block to include a Classic Menu in block themes.

## Description

"Classic" appearance menus remain a good solution when those who
may edit menus should not be allowed to edit an entire theme.
Unfortunately, WordPress does not have a block which will include
a classic menu *and remain in sync with that menu,* requiring
escalation to reimport edits made in the classic menu editor.

## Installation

This plugin may be installed like any other, by uploading the
release zip to your plugins directory.

## Changelog

### 0.1.0
* Release

## Development

This block was created with the @wordpress/create-block scaffold. It
includes prettier and php-cs-fixer for code standards.

### Initial setup

```
npm install
composer install
```

php-cs-fixer uses WordPress function and class tokens from .phpcs-tokens.
Due to that moving target, tokens must be refreshed from time to time. Composer
will automatically do this after install/update.

```
cd .phpcs-tokens
./refresh.sh
```

### Building

#### Development
```
npm start
```

#### Production
```
npm run build
```

Production build is compiled to the build dir.