#include <iostream>
#include <string>
#include <random>
#include <algorithm>
#include <iterator>
#include <ctime>
#include "rapidjson/writer.h"
#include "rapidjson/prettywriter.h"
#include "rapidjson/stringbuffer.h"

using namespace rapidjson;
using namespace std;

int main(int argc, char *argv[]) {
    StringBuffer s;
    PrettyWriter<StringBuffer> writer(s);
    /*
    writer.StartObject();
    writer.String("hello");
    writer.String("world");
    writer.String("t");
    writer.Bool(true);
    writer.String("f");
    writer.Bool(false);
    writer.String("n");
    writer.Null();
    writer.String("i");
    writer.Uint(123);
    writer.String("pi");
    writer.Double(3.1416);
    writer.String("a");
    writer.StartArray();
    for (unsigned i = 0; i < 4; i++)
        writer.Uint(i);
    writer.EndArray();
    writer.EndObject();
*/

    size_t MAXLEN;
    cin >> MAXLEN;
    vector<size_t> nodes;

    for( size_t i = 0; i < MAXLEN; ++i ) {
        nodes.push_back(i);
    }

    vector<size_t> edges = nodes;
    std::srand(std::time(0));

    random_device rd;
    mt19937 g(rd());
 
    shuffle(nodes.begin(), nodes.end(), g);
    shuffle(edges.begin(), edges.end(), g);

    writer.StartObject();
    writer.String("nodes");

    writer.StartArray();
    for( int i = 0; i < MAXLEN; ++i ) {
        writer.StartObject();
        writer.String("data");
        writer.StartObject();
        writer.String("id");
        string node = "node" + to_string(nodes[i]);
        writer.String(node.c_str());
        writer.String("color");
        writer.String("#ffffff");
        writer.String("file");
        writer.String("foo3");
        writer.EndObject();
        
        writer.String("position");
        writer.StartObject();
        writer.String("x");
        writer.Uint(rand() % 100000);
        writer.String("y");
        writer.Uint(rand() % 100000);
        writer.EndObject();

        writer.EndObject();
    }
    writer.EndArray();

    writer.String("edges");

    writer.StartArray();
    for( int j = 0; j < 3; j++ ) {
    shuffle(nodes.begin(), nodes.end(), g);
    shuffle(edges.begin(), edges.end(), g);
        for( int i = 0; i < MAXLEN; ++i ) {

            if( rand() % 3 == 0 )
                continue;
            writer.StartObject();
            writer.String("data");
            writer.StartObject();
            writer.String("source");
            string source = "node" + to_string(nodes[i]);
            writer.String(source.c_str());
            writer.String("target");
            string target = "node" + to_string(edges[i]);
            writer.String(target.c_str());
            writer.String("color");
            writer.String("#000000");
            writer.EndObject();
            writer.EndObject();
        }
    }
    writer.EndArray();

    writer.EndObject();

    cout << s.GetString() << endl;

    return 0;
}
