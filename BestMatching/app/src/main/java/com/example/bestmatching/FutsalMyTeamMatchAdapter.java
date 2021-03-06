package com.example.bestmatching;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.util.ArrayList;

public class FutsalMyTeamMatchAdapter extends BaseAdapter {

    private TextView my_team_match_title;
    private TextView my_team_match_ground;
    private TextView my_team_match_start_time;
    private TextView my_team_match_end_time;
    private TextView my_team_match_part_user;
    private TextView my_team_match_max_user;

    public LinearLayout my_team_match_list_click;

    private ArrayList<FutSalMyMatchItems> my_team_matchItems = new ArrayList<FutSalMyMatchItems>();

    public FutsalMyTeamMatchAdapter() {

    }


    // 어댑터에 사용되는 데이터 개수 리턴
    @Override
    public int getCount() {
        return my_team_matchItems.size();
    }


    //지정한 포지션에 있는 데이터 리턴
    @Override
    public Object getItem(int position) {
        return my_team_matchItems.get(position);
    }


    //지정한 포지션에 있는 데이터와 관계된 아이템의 id리턴
    @Override
    public long getItemId(int position) {
        return position;
    }


    // 포지션에 위치한 데이터를 화면에 출력하는데 사용될 뷰를 리턴
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        final int pos = position;
        final Context context = parent.getContext();

        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(R.layout.fragment_futsal_my_team_match_item, parent, false);
        }

        my_team_match_title = (TextView) convertView.findViewById(R.id.my_team_match_title);
        my_team_match_ground = (TextView) convertView.findViewById(R.id.my_team_match_ground);
        my_team_match_start_time = (TextView) convertView.findViewById(R.id.my_team_match_start_time);
        my_team_match_end_time = (TextView) convertView.findViewById(R.id.my_team_match_end_time);
        my_team_match_part_user = (TextView) convertView.findViewById(R.id.my_team_match_part_user);
        my_team_match_max_user = (TextView) convertView.findViewById(R.id.my_team_match_max_user);

        FutSalMyMatchItems futSalMyMatchItems = my_team_matchItems.get(position);

        my_team_match_title.setText(futSalMyMatchItems.getTitle());
        my_team_match_ground.setText(futSalMyMatchItems.getGround());
        my_team_match_start_time.setText(futSalMyMatchItems.getStartTime());
        my_team_match_end_time.setText(futSalMyMatchItems.getEndTime());
        my_team_match_part_user.setText(futSalMyMatchItems.getPartUser());
        my_team_match_max_user.setText(futSalMyMatchItems.getMaxUser());

        my_team_match_list_click = (LinearLayout)convertView.findViewById(R.id.my_team_match_list_click);

        return convertView;
    }


    //아이템 데이터 추가를 위한 함수
    public void addItem(String title, String ground, String start_time, String end_time, String part_user, String max_user){
        FutSalMyMatchItems mymatchSearchItems = new FutSalMyMatchItems();

        mymatchSearchItems.setTitle(title);
        mymatchSearchItems.setGround(ground);
        mymatchSearchItems.setStartTime(start_time);
        mymatchSearchItems.setEndtime(end_time);
        mymatchSearchItems.setPartUser(part_user);
        mymatchSearchItems.setMaxUser(max_user);

        my_team_matchItems.add(mymatchSearchItems);
    }

    public void clearItem(){
        my_team_matchItems.clear();
    }


}
