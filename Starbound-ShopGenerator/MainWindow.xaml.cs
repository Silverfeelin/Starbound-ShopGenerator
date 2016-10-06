using Microsoft.Win32;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Starbound_ShopGenerator
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        List<ShopItem> items;
        bool updatePending = false;

        private ShopItem SelectedItem
        {
            get
            {
                return (ShopItem)lbxItems.SelectedItem;
            }
        }

        public MainWindow()
        {
            InitializeComponent();
            items = new List<ShopItem>();
        }

        #region Items

        #region Control Event Handlers

        private void lbxItems_Drop(object sender, DragEventArgs e)
        {
            if (e.Data.GetDataPresent(DataFormats.FileDrop))
            {
                AddItems((string[])e.Data.GetData(DataFormats.FileDrop));
            }
        }

        private void btnAddFiles_Click(object sender, RoutedEventArgs e)
        {
            OpenFileDialog ofd = new OpenFileDialog()
            {
                Filter = "JSON Files|*.json|All Files|*.*",
                Multiselect = true,
                CheckFileExists = true,
                Title = "Select StarCheat Export(s)"
            };

            bool? res = ofd.ShowDialog();
            if (!res.HasValue || !res.Value)
            {
                return;
            }


            string[] files = ofd.FileNames;
            AddItems(files);
        }

        private void btnAddText_Click(object sender, RoutedEventArgs e)
        {
            TextDialog td = new TextDialog();
            bool? res = td.ShowDialog();
            if (res.HasValue && res.Value)
                TryAddItem(td.Result);

        }

        private void btnAddClipboard_Click(object sender, RoutedEventArgs e)
        {
            TryAddItem(Clipboard.GetText());
        }

        #endregion

        #region Adding Items

        private void AddItem(string json)
        {
            try
            {
                ShopItem item = new ShopItem(json);
                items.Add(item);
                lbxItems.Items.Add(item);
            }
            catch (JsonReaderException exc)
            {
                throw new ArgumentException("Invalid JSON! The item could not be added.\nConfirm your JSON is valid by linting it.", exc);
            }

        }

        private void TryAddItem(string json)
        {
            try
            {
                AddItem(json);
            }
            catch (ArgumentException exc)
            {
                MessageBox.Show(exc.Message);
            }
            catch (Exception exc)
            {
                Clipboard.SetText(string.Format("{0}\n{1}", exc.Message, exc.StackTrace));
                MessageBox.Show("Uncaught exception copied to clipboard!\n" + exc.Message);
            }
        }

        private void AddItems(string[] files)
        {
            int skipped = 0;
            foreach (string item in files)
            {
                if (File.Exists(item))
                {
                    try
                    {
                        AddItem(File.ReadAllText(item));
                    }
                    catch
                    {
                        skipped++;
                        continue;
                    }
                }
                else
                    skipped++;
            }

            if (skipped > 0)
                MessageBox.Show("A total of " + skipped + " item(s) have been skipped, as they do not appear to be valid.");
        }

        #endregion

        #region Selecting Item

        private void lbxItems_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (updatePending)
                UpdateItem();
            SelectItem(SelectedItem);
        }

        private void SelectItem(ShopItem item = null)
        {
            updatePending = false;

            bool isItem = item != null;

            tbxItemJson.Text = isItem ? item.Item.ToString(Newtonsoft.Json.Formatting.Indented) : "";
            btnUpdate.IsEnabled = isItem;
            btnRemove.IsEnabled = isItem;
        }

        #endregion

        #endregion

        #region Selected Item

        #region Control Event Handlers

        private void btnUpdate_Click(object sender, RoutedEventArgs e)
        {
            UpdateItem();
        }

        private void btnRemove_Click(object sender, RoutedEventArgs e)
        {
            RemoveItem();
        }

        #endregion

        private void UpdateItem()
        {
            if (SelectedItem == null) return;

            try
            {
                JObject newItem = JObject.Parse(tbxItemJson.Text);
                SelectedItem.Item = newItem;
            }
            catch (Exception exc)
            {
                MessageBox.Show("The item could not be updated. Please confirm your JSON is valid.\n" + exc.Message);
                return;
            }

            MessageBox.Show("The item has been updated!");
        }

        private void RemoveItem()
        {
            items.Remove(SelectedItem);
            lbxItems.Items.Remove(lbxItems.SelectedItem);
            SelectItem();
        }

        #endregion

        #region Output

        #region Control Event Handlers

        private void btnCopy_Click(object sender, RoutedEventArgs e)
        {
            TemplateSettings settings = GetTemplateSettings();
            JObject shop = GetShop(settings);

            string command = string.Format("/spawnitem {0} 1 '{1}'", settings.Type, shop["parameters"].ToString(Formatting.None).Replace("'", "\\'").Replace(@"""regex"":""x?\\d{0,3}""", @"""regex"":""x?\\\\d{0,3}"""));
            Clipboard.SetText(command);

        }

        private void btnExport_Click(object sender, RoutedEventArgs e)
        {
            SaveFileDialog sfd = new SaveFileDialog()
            {
                Title = "Exported shop location",
                Filter = "JSON File|*.json"
            };

            bool? res = sfd.ShowDialog();
            if (!res.HasValue || !res.Value) return;

            JObject shop = GetShop(GetTemplateSettings());

            File.WriteAllText(sfd.FileName, shop.ToString(Formatting.Indented));
        }

        #endregion

        private TemplateSettings GetTemplateSettings()
        {
            TemplateSettings settings = new TemplateSettings()
            {
                Title = tbxTitle.Text,
                Subtitle = tbxSubtitle.Text,
                Type = cbxType.SelectedValue.ToString()
            };

            return settings;
        }

        private JObject GetShop(TemplateSettings settings)
        {
            JObject template = JObject.Parse(Properties.Resources.Template);

            template["name"] = settings.Type;

            JToken windowtitle = template.SelectToken("parameters.interactData.config.paneLayout.windowtitle");
            windowtitle["title"] = "  " + settings.Title;
            windowtitle["subtitle"] = "  " + settings.Subtitle;

            JArray recipes = (JArray)template.SelectToken("parameters.interactData.recipes");
            JObject recipe = new JObject();
            recipe["input"] = new JArray();
            foreach (var item in items)
            {
                JObject newRecipe = (JObject)recipe.DeepClone();
                newRecipe["output"] = item.Item;
                recipes.Add(newRecipe);
            }

            return template;
        }

        #endregion
    }
}
