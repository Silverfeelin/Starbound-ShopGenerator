# Starbound Shop Generator
A simple tool that generates shops for custom items.

### Notes
* This tool is meant for users to make shops to share their items.  
As of right now, there is no features present that let you set the price for the items.

* The tool uses a template almost identical to [the one IHazBagels made and shared on the ILoveBacons community forums](http://ilovebacons.com/threads/shop-template-for-mall-shops.10988/).

![](https://raw.githubusercontent.com/Silverfeelin/Starbound-ShopGenerator/master/readme/overview.png)

## Table of Contents
- [Notes](#notes)
- [Installation](#installation)
- [Usage](#usage)
 - [Adding Items](#adding-items)
 - [Editing Selected Item](#editing-selected-item)
 - [Changing Settings](#changing-settings)
 - [Creating the Shop](#creating-the-shop)

## Installation
* Make sure you have [.NET Framework 4.5](https://www.microsoft.com/en-us/download/details.aspx?id=30653) installed.
* Download the [latest release](https://github.com/Silverfeelin/Starbound-ShopGenerator/releases).
* Unpack the contents of the zipped release to one folder.

## Usage
Functionality of the application is split in four categories. To open the application, run the `Starbound-ShopGenerator.exe` file that you unpacked in [Installation](#installation).

### Adding Items
You can add items to the list using three different methods. All methods expect a valid item export formatted like the below example.  
Note that this format is the same format [StarCheat](http://starcheat.org/) uses for item exports; so these files will be compatible.

```json
{
  "name" : "commonassaultrifle",
  "count" : 1,
  "parameters" : {
    "level" : 5
  }
}
```

#### Add using file(s)
This option allows you to select one or multiple exported files.

#### Add using text
This option will prompt you to write or paste an item in a text field.

You can confirm adding the item by selecting `Confirm`, or cancel adding the item by selecting `Cancel` or closing the window.

![](https://raw.githubusercontent.com/Silverfeelin/Starbound-ShopGenerator/master/readme/textDialog.png)  
*Adding an item by putting it in the text field.*

#### Add from clipboard
This option will use the current contents of your clipboard.

### Editing Selected Item
After selecting any item from the item list, the JSON will be shown.

You can tweak the item by editing the text and pressing `Update`. Note that without pressing `Update`, none of your changes have been applied to the selected item!  
Changes will not be applied if the updated JSON is not valid.

You can remove the selected item by pressing `Remove`.

### Changing Settings
There are a few general settings for the object and the interface that can be tweaked, such as the window title and subtitle.

### Creating the Shop
There are two methods to choose from after selecting your items.

#### Create Shop and Copy to Clipboard
This will copy a `/spawnitem` command to quickly obtain the shop. Note that most characters are not properly escaped, meaning items containing characters such as `'` and `"` will cause the command to fail.

#### Create Shop and Export to File
This will save an item export for the shop to a file of your choice. This file is also a valid export and can be used with StarCheat.
