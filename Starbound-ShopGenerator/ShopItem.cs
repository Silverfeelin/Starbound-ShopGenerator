using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starbound_ShopGenerator
{
    public class ShopItem
    {
        private JObject _item = null;
        public JObject Item
        {
            get
            {
                return _item;
            }
            set
            {
                if (value["count"] == null || value["name"] == null)
                {
                    throw new ArgumentException("This does not appear to be a valid item! There's no count or name parameter present.");
                }
                _item = value;
            }
        }

        public ShopItem(string json)
        {
            Item = JObject.Parse(json);
        }

        public override string ToString()
        {
            return Item["name"].Value<string>();
        }
    }
}
