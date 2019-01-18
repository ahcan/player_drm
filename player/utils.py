from ezdrm_test.MySQL_db import Database

def get_author(username):
    db = Database()
    squrey = "select iplay from play_user where uname = '{0}';".format(username)
    print squrey
    res = db.execute_query(squrey)
    return res

